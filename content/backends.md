# Backends

By default, Uppload works with any file uploading backend because it sends `FormData`. Uppload does **not** provide the server side implementation of handling the files, but the way files are uploaded is identical to simple file upload forms like this:

```html
<form action="/endpoint" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
</form>
```

Here are some common backend templates to get your started:

- [Ruby on Rails](http://guides.rubyonrails.org/form_helpers.html#uploading-files)
- [PHP (Basic)](http://www.startutorial.com/articles/view/how-to-build-a-file-upload-form-using-dropzonejs-and-php)
- [Laravel](http://maxoffsky.com/code-blog/howto-ajax-multiple-file-upload-in-laravel/)
- [Symfony 2 and AWS S3](http://www.jesuisundev.fr/upload-drag-drop-via-dropzonejs-symfony2-on-cloud-amazon-s3/)
- [ASP.NET](https://www.codeproject.com/Articles/874215/File-upload-in-ASP-NET-MVC-using-Dropzone-JS-and-H)
- [ServiceStack](http://www.buildclassifieds.com/2016/01/08/uploading-images-servicestack-and-dropzone/)
- [Golang](https://hackernoon.com/how-to-build-a-file-upload-form-using-dropzonejs-and-go-8fb9f258a991)
