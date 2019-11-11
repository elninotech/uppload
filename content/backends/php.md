# Uploading files to a PHP backend

If you have a PHP backend, you can receive files uploaded by Uppload just like you would with HTML forms, using `$_FILES`.

By default, the [Axios uploader](/uploaders/axios) uses the `file` key, so you can get the image like this:

```php
<?php
if (isset($_FILES["file"])) {
  // Get the uploaded file
  $file = $_FILES["file"];

  // Store the file somewhere
  if (move_uploaded_file($_FILES["file"]["tmp_name"], __DIR__."/../uploads/". $_FILES["file"]["name"])) {
    echo "Uploaded successfully";
  } else {
    echo "File was not uploaded";
  }
}
?>
```

You can read any of the following tutorials for more detailed information about file uploads in PHP:

- [Handling file uploads on the PHP manual](https://www.php.net/manual/en/features.file-upload.php)
- [PHP File Upload on W3Schools](https://www.w3schools.com/php/php_file_upload.asp)
- [PHP File Uploading on Tutorialspoint](https://www.tutorialspoint.com/php/php_file_uploading.htm)
- [How to Upload a File in PHP on Tuts+](https://code.tutsplus.com/tutorials/how-to-upload-a-file-in-php-with-example--cms-31763)
