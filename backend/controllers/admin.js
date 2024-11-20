export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            return res.status(201).json({ admin : email });
        }else{
            return res.status(400).json({error : "Invalid Credentials"})
        }
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}