var StorageView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-storage-details').html()),
	initialize: function(){
		alert("initialize StorageView");
		//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFSSuccess, app.onError);
		directoryLocation.getFile(timestampFile, {create:false}, this.fileAppend, app.onError);
	},
  	fileAppend: function(fs){
		alert("fileAppend");
  		alert(fs.fullPath);
    		fs.createWriter(function(fileWriter) {
			alert("fs.createWriter");
			fileWriter.onwrite = function(evt) {
		            app.showContent("fileAppend wrote to file");
		        };
			//go to the end of the file...
			//fileWriter.seek(fileWriter.length);
			//get local data to store
			this.getLocalData("local","save");
			//alert(localSave);
			//fileWriter.write(localSave);
			fileWriter.write("test");
			//var localSave = new Blob(['this is a test emergency'], {type: 'text/plain'});
    		}, app.onError);
        },
  	getLocalData: function(a,t){
     		alert("a: "+a);
     		alert("t: "+t);
     		var localSave;
     		var prevStorage = window.localStorage.getItem("fcs-keys");
      		alert("prevStorage: "+prevStorage); 
     		if (prevStorage != null){
	     		alert("The following session keys are saved " + prevStorage);
	     		var keysArray = prevStorage.split(',');
	     		//var connectionStatus = navigator.onLine ? 'online' : 'offline';
	     		//if(connectionStatus != "offline") {
	     		var currentKey; // currentKey = sessionid
	     		var loopNum=keysArray.length;
	     		alert("Should loop " + loopNum + " times");
	     		for(var i=0; i<loopNum; i++){
		     		//alert("Loop number " +  i + "");
		     		currentKey = keysArray.pop();
		     		//alert("currentKey: "+currentKey);
		     		currentTime = currentKey.split('-');
		     		//alert("currentTimestamp: "+currentTime[2]);
		     		var read =  window.localStorage.getItem(currentKey);
		     		if(a=="local"){
     					//alert("a: "+a);
					localSave += read;	
		     		}
		     		//alert("Read Session: "+ read);
		     		if(a=="remote"){
					alert("read: "+read);
		     			app.submitRemote(read,currentTime[2]);
		     		}
			     	//to_submit = read.split(',');
			     	//n = oldKey.split('_')[1];
	     		} // close for
	     		if(a=="local"){
   				alert("a Save: ");
				return localSave;
	     		}
		}
	},
	render: function(){
		$("#landing").hide();
		$(headerView.el).show();
		$('#question').html("Camera");
		$(this.el).html("");
		//$(this.el).html(this.template({FAquestions: this.FAQcol.toJSON() }));	
	}
});
