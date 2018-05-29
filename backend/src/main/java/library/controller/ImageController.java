package library.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

/**
 * Created by Paul on 28/05/2018.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class ImageController {


    public ImageController() {
    }

    @CrossOrigin
    @GetMapping(
            value = "/image/{filename}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody byte[] getImage(@PathVariable("filename") String filename) throws IOException {
        File inFile = new File("/Users/macbookpro/home stuff/proiecte_sd/images/" + filename);
        InputStream in  = new FileInputStream(inFile);
        return IOUtils.toByteArray(in);
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = "/image/{filename}")
    public ResponseEntity<?> handleFileUpload(@PathVariable("filename") String filename, @RequestParam MultipartFile file) {

        try {

            File parentDirectory = new File("/Users/macbookpro/home stuff/proiecte_sd/images/");

            File image = new File(parentDirectory, filename);

            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(image));
            bos.write(file.getBytes());
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}

