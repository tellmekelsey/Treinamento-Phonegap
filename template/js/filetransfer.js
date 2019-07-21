encodeImageUri = function(imageUri, callback) {
    var c 			= document.createElement('canvas');
    var ctx 		= c.getContext("2d");
    var img 		= new Image();
    img.onload 		= function() {
        c.width 	= this.width;
        c.height 	= this.height;
        ctx.drawImage(img, 0, 0);

        if(typeof callback === 'function'){
            var dataURL = c.toDataURL("image/jpeg", 1);
            callback(dataURL.slice(22, dataURL.length));
        }
    };
    img.src = imageUri;
}
sender = function(base64, url, win, fail, options)
{
	var _op  		= options.params;
	var imageData 	= base64;
	var _k   		= {fileKey: options.fileKey, fileName:options.fileName, mimeType: options.mimeType, imageData: imageData};
	var data 		= Object.assign({}, _op, _k);
	var comp 		= data;
	// $('.teste').html(JSON.stringify(data));
	$.ajax({
	  async: false,
		url: url,
		type:'POST',
		data:comp,
		dataType: "json",
	  success: function(response) {
	  	// alert(JSON.stringify(response));
	  	var r = {response:response};
	    win(r);
	  },
	  error: function (xhr, ajaxOptions, thrownError) {
	  		var error = {
	  			code: xhr.status
	  		}	  		
	  		// alert(JSON.stringify(xhr));
	        fail(error);	
  		}
	});
}
function FileUploadOptions()
{
   var options = {};
}
function FileTransfer()
{
	this.upload = function(imageData, url, win, fail, options, aux)
	{
		encodeImageUri(imageData, function(base64) {
  			sender(base64, url, win, fail, options, aux);
		});
	}
}
