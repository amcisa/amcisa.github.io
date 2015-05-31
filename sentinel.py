import time
import logging
import re
import os.path
from subprocess import Popen
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler,FileSystemEventHandler
import server

class JadeHandler(FileSystemEventHandler):
   def __init__(self):
      super().__init__()
      print("Refreshing all current versions")
      p=Popen(["jade","-P","./post","--out","./"],cwd="./",shell=True)
      p.wait(360)
      for folder in [dir for dir in os.listdir("./events") if re.search("\.post",dir)]:
         outdir=folder.split(".")[0]
         if not os.path.exists("./events/"+outdir): os.mkdir("./events/"+outdir)
         p=Popen(["jade","-P","./events/"+folder,"--out","./events/"+outdir],cwd="./",shell=True)
         p.wait(360)
      print("Refreshing complete")


   def parse_file_path(self, filepath):
      filedata=dict()
      filedata["full-path"]=filepath
      filedata["dirname"]=os.path.dirname(filepath)
      filedata["filename"]=os.path.basename(filepath)
      if(re.search("events.\d\d-\d\d", filepath)):
         filedata["type"]="events"
         filedata["outdir"]="."+filedata["dirname"].split(".")[1]
      elif(re.search("post.\w", filepath)):
         filedata["type"]="post"
         filedata["outdir"]="./"
      else: print(filepath)
      return filedata
   def remove_older_version(self,dirname,filename):
      #Here I will hardcode the filepaths instead
      tempname="{0}/{1}.html".format(dirname, os.path.splitext(filename)[0])
      #print(tempname)
      #print(os.path.exists(tempname))
      if(os.path.exists(tempname)):os.remove(tempname)
      #print(os.path.exists(tempname))
   def create_new_version(self,dirname,filename):
      p=Popen(["jade","-P",filename,"--out",dirname],cwd="./",shell=True)
      stdout, stderr = p.communicate()
      return p
   def generator(self,event):
      print("File created ->"+event.src_path)
      if event.src_path.split(".")[-1].lower() in ("jade", "md"): 
         print("rendering")
         data=self.parse_file_path(event.src_path)
         print("parsed")
         if(data["type"]):
            print(data)
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

def startLogger():
   logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')   
   event_handler = LoggingEventHandler()
   observer = Observer()
   observer.schedule(event_handler, ".", recursive=True)
   observer.start()
   try:
      while True:
         time.sleep(1)
   except KeyboardInterrupt:
      observer.stop()
   observer.join()

if __name__ == "__main__":
   print("Started Sentinel")
   startRender()
   #startLogger()
   print("Launching page")
   server.serve(8000)