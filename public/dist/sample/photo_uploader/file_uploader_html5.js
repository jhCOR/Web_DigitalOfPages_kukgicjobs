alert("_________");
 	var sFileInfo = '';
	var headers =new array();
	 
	// foreach($_SERVER as k => v) {                 //$_SERVER,$k,$v
	// 	if(k.substring(0,9)== "HTTP_FILE") {
	// 		k = substring((k.toLowerCase()), 5);
	// 		headers[k] = v;
	// 	} 
	// }
	var url = document.location.href;
	console.log('url:'+url);


    var filename = rawurldecode(headers['file_name']);//rawurldecode
    var list= filename.split('.');
	var filename_ext = list[list.length].toLowerCase();
	var allow_file =new array("jpg", "png", "bmp", "gif"); 

	if(!allow_file.includes(filename_ext)) {
		return "NOTALLOW_"+filename;
	} else {
        var file = new stdClass;
        var rand = Math.floor(Math.random() * 100000);
		file.name = date("YmdHis")+rand+"."+filename_ext;
		file.content = file_get_contents("php://input");

		uploadDir = '../../upload/';
		if(!is_dir(uploadDir)){
			mkdir(uploadDir, 0777);
		}
		
		newPath = uploadDir+file.name;
		
		if(file_put_contents(newPath, file.content)) {
			sFileInfo += "&bNewLine=true";
			sFileInfo += "&sFileName="+filename;
			sFileInfo += "&sFileURL=upload/"+file.name;
		}
		
		return sFileInfo;
	}
