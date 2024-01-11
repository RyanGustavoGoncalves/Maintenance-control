export const tokenMail = async (email, token) => {
    try {
        const response = await fetch("http://localhost:8080/update-password/generate-token", {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(email),
        });

        if (response.ok) {
            alert("Token enviado!");
        } else {
            console.log("Ocorreu um erro ao gerar o token:", response.status);
            const errorMessage = await response.text(); // Obtém o corpo da resposta em caso de erro
            alert(`Erro ao gerar o token: ${errorMessage}`);
        }
    } catch (error) {
        console.log("Erro ao gerar o token:", error);
        alert("Erro ao gerar o token. Por favor, tente novamente mais tarde.");
    }
};