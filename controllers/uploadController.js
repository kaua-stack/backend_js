class UploadController {
    
    uploadImage(req, res) {
        console.log(req.file);
        console.log(req.body);
        if (!req.file) {
            return res.status(400).json({
                error: "Nenhuma imagem foi enviada!",
            });
        }
 
        return res.status(200).json({
            message: "Imagem enviada com sucesso!",
            filename: req.file,
        });
    }
}
 
export default new UploadController();