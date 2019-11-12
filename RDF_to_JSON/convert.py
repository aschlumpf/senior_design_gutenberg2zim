import os.path
import sys
import metadata
import json
folder_path = None
j_s = dict()
total = None
count = 0

def print_it(x, dir_name, files):
	global j_s
	global total
	if len(files)>1:
		total = len(files)
		return
	top_lvl = dir_name.split("/")[-1]
	for i in files:
		JSON = metadata.pg_rdf.pg_rdf_to_json(dir_name+"/"+i)
		for i in JSON.keys():
			if i not in j_s:
				j_s[i] = dict()
			j_s[i][top_lvl] = JSON[i]	
	global count
	global folder_path
	count+=1
	if count%50==0:
		# with open(folder_path, 'w') as outfile:
		# 	json.dump(j_s, outfile)
		# exit()
		print str(count)+" out of "+str(total)+" done"
  



def main(path, file_name):

	global j_s
	global folder_path
	folder_path = file_name
	os.path.walk(path, print_it, 0)
	with open(folder_path, 'w') as outfile:
		json.dump(j_s, outfile)

if __name__ == "__main__":
	if len(sys.argv) <= 2:
		print "Usage: python2 convert.py [root-folder-path] [json_file]"
	else:
		main(sys.argv[1], sys.argv[2])
