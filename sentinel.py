import time
import logging
import re
import os.path
from subprocess import Popen
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import server

class JadeHandler(FileSystemEventHandler):
   def __init__(self):
      super().__init__()
      print("Refreshing all current versions")
      #All templates should be completely rendered before the program
      #can check for individual changes
      p=Popen(["jade","-P","./post","--out","./"],cwd="./",shell=True)
      p.wait(360)
      #Search for all event year folders of format (YY-YY) 
      #And rerenders them
      for folder in [dir for dir in os.listdir("./events") if re.search("\.post",dir)]:
         outdir=folder.split(".")[0] #normal format is ./events/YY-YY.post
         if not os.path.exists("./events/"+outdir): os.mkdir("./events/"+outdir)
         p=Popen(["jade","-P","./events/"+folder,"--out","./events/"+outdir],cwd="./",shell=True)
         p.wait(360)
      print("Refreshing complete")


   def parse_file_path(self, filepath):
      filedata=dict()
      filedata["full-path"]=filepath
      filedata["dirname"]=os.path.dirname(filepath)
      filedata["filename"]=os.path.basename(filepath)
      filedata["type"]="render"
      if(re.search("events.\d\d-\d\d.post", filepath)):         
         filedata["outdir"]="."+filedata["dirname"].split(".")[1]
      elif(re.search("events.\d\d-\d\d.includes", filepath)):
         filedata["outdir"]="."+filedata["dirname"].split(".")[1]
         filedata["full-path"]=filedata["outdir"]+".post"
      elif(re.search("post.\w", filepath)):
         filedata["outdir"]="./"
      elif(re.search("includes", filepath)):
         filedata["outdir"]="./"
         filedata["full-path"]=filedata["outdir"]+"post"
      else: 
         #Catch any md/jade/html files that are not post content
         filedata["type"]="none"
      return filedata

   def remove_older_version(self,dirname,filename):
      tempname="{0}/{1}.html".format(dirname, os.path.splitext(filename)[0])
      if(os.path.exists(tempname)):
         os.remove(tempname)
         print("Old version found and removed: ", tempname)
      else:
         print("Old version not found.")

   def create_new_version(self,dirname,filename):
      print("Creating new file from : \"{0}\" in : \"{1}\"".format(filename, dirname))
      #Non blocking for parallel rendering
      p=Popen(["jade","-P",filename,"--out",dirname],cwd="./",shell=True)
      stdout, stderr = p.communicate() #Shows jade rendering status
      return p

   def generator(self,event):
      if event.src_path.split(".")[-1].lower() in ("jade", "md", "html"): 
         data=self.parse_file_path(event.src_path)
         if(data["type"]!="none"):
            self.remove_older_version(data["outdir"],data["filename"])
            self.create_new_version(data["outdir"],data["full-path"])

   def on_created(self,event):
      self.generator(event)
   def on_modified(self,event):
      self.generator(event)

def startRender():
   jade_handler  = JadeHandler()   
   renderer = Observer()
   renderer.schedule(jade_handler,"./", recursive=True)
   renderer.start()

if __name__ == "__main__":
   print("Started Sentinel")
   startRender()
   print("Launching page")
   server.serve(8000)