var StorageListView = Backbone.View.extend({
	el: '#content',
	template:_.template($('#tpl-storage-list-details').html()),
	initialize: function(){
		alert("initialize StorageListView");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFSSuccess, app.onError);
	},
    	onFSSuccess: function(fs){
        	alert("onFSSuccess");
		fileSystem = fs; 
		return fileSystem;
		this.fileDirectoryListing();
	},
    	onError: function(){
		alert("onError");
	},
    	fileDirectoryListing: function(e){
	   	alert("fileDirectoryListing");
	  	//get a directory reader from our FS
	 	var dirReader = fileSystem.root.createReader();
		dirReader.readEntries(this.gotFiles,app.onError);        
        },
   	gotFiles: function(entries) { 
		alert("gotFiles");
		var s = "";
		for(var i=0,len=entries.length; i<len; i++) {
			s+= entries[i].fullPath;
			if (entries[i].isFile) {
	     			  s += " [F]";
		  	} else {
		  		  s += " [D]";
		  	}
	 		s += "<br/>";
	     	}
	        s+="<p/>";
		alert("showContent render here");
	        app.showContent(s);
	},
	render: function(){
		$("#landing").hide();
		$(headerView.el).show();
		$('#question').html("Camera");
		$(this.el).html("");
		//$(this.el).html(this.template({FAquestions: this.FAQcol.toJSON() }));	
	}
});
