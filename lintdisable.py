def file_get_contents(filename):
    with open(filename) as f:
        return f.readlines()

def line_prepender(filename, line):
    with open(filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(line.rstrip('\r\n') + '\n' + content)

lines = file_get_contents("lint.txt")

s = set()
for line in lines:
  s.add(line[7 : line.find("[")])

for line in list(s):
  line_prepender(line, "// tslint:disable:no-invalid-this")
  print(line)
