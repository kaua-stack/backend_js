import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()


// posso exportar como default colocando o export ao criar a constant ou classe
export const authenticationToken = (req, res, next) => {

    const getToken = req.headers.authorization;
    const bearerTokken = getToken.split(" ")[1];

    if (!bearerTokken) {
        return res.status(401).json({ error: "Token não fornecido" })
    }


    //
    jwt.verify(bearerTokken, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ error: "Token inválido!" })
        }

        req.user = user

        next()
    });

}



