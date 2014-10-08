import time
import logging
import webbrowser
from subprocess import Popen
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler,FileSystemEventHandler

import server

class JadeHandler(FileSystemEventHandler):
   def __init__(self, path,*args, **kwargs):
      super().__init__()
      self.path=path
   
   def renderJade(self):
      p=Popen(self.path,cwd="./",shell=True)
      stdout, stderr = p.communicate()
      return p
   def on_created(self,event):
      print("File created ->"+event.src_path)
      self.renderJade()
   def on_modified(self,event):
      print("File modified ->"+event.src_path)
      self.renderJade()

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

def startRender(path,batfile):
   jade_handler  = JadeHandler(batfile)   
   renderer = Observer()
   renderer.schedule(jade_handler, path, recursive=True)
   renderer.start()

if __name__ == "__main__":
   server.serve(7000)
   startRender("post","rpost.bat")
   startRender("events/14-15","revent.bat")
   startLogger()
