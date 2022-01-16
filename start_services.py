from applescript import tell
import os

# set what command you want to run here
dir = os.getcwd()

print("Starting rest")

cmd = "export PROTOBUF_TOOLS_OS=macosx; export PROTOBUF_TOOLS_CPU=x64; dotnet watch run"

pos = "\nset bounds of first window to {0, 1, 600, 700}"
backend = r"cd \"%s/rest/rest\"; %s" % (dir, cmd)
tell.app("Terminal", 'do script "' + backend + '"' + pos)

print("Starting ui")

pos = "\nset bounds of first window to {680, 1, 1280, 700}"
webclient = r"cd \"%s/ui\"; npx ng serve" % dir
tell.app("Terminal", 'do script "' + webclient + '"' + pos)
