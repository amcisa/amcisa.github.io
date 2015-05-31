import os.path
import os
import re
import shutil

def templateAvailable():
  #The event templates should be placed outside the main folder
  return (os.path.exists("../event/event_year.post"))

def copyFiles(prefix, outputdir, default="org.event", defaultdir="../event/event_year.post"):
  outputdir="./events/{0}/".format(outputdir)
  if not (os.path.exists(outputdir)):
    os.mkdir(outputdir)
  for file in os.listdir(defaultdir):
    inputfile=defaultdir+"/"+file
    outputfile=outputdir+re.sub(default,prefix,file)
    shutil.copyfile(inputfile,outputfile)
    replaceFile(outputfile,prefix)
    print(outputfile, " created")

def replaceFile(outputfile, prefix, default="org.event"):
  f = open(outputfile,'r', encoding="utf-8")
  filedata = f.read()
  f.close()
  newdata = filedata.replace(default,prefix)
  f = open(outputfile,'w', encoding="utf-8")
  f.write(newdata)
  f.close()
  

def getAcademicYear():
  year=input("Which academic year? Example format: 14-15....>")
  return year+".post" if (re.search("\d\d-\d\d", year)) else getAcademicYear()

def getOrganisation():
  org=input("Which organisation? Enter number. Amcisa[0],NTU[1],NUS[2]....>")
  orgType=["amc","ntu","nus"]
  if org.isdigit() and int(org)<len(orgType):
    return orgType[int(org)]
  else:
    print("Only options 0,1,2 are accepted")
    return getOrganisation()

def getEventInitials():
  return input("Enter event initials. Example: mygather ....>")
  

def main():
  #main entry point
  if not templateAvailable():
    return False
  
  #ask for year
  outputdir=getAcademicYear()
  
  #ask for organisation and event initials
  filename=getOrganisation()+"."+getEventInitials()

  copyFiles(filename,outputdir)
  input("Completed. Press Enter to exit")
 
if __name__=="__main__":
  main()
