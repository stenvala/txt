import os
import subprocess

cmd = ["export PROTOBUF_TOOLS_OS=macosx; export PROTOBUF_TOOLS_CPU=x64; dotnet publish -c Release"]

subprocess.check_call(cmd, cwd="./rest/rest", shell=True)

os.chdir("ui")
os.system("rm -rf dist")
os.system("npx ng build --configuration production")
