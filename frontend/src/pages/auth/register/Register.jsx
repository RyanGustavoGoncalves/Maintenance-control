import { useState } from "react";
import '../components/style.css'
import imgError from '../assets/icons8-erro-48 (1).png';
import img from '../assets/aboutImg.png';
import wave from '../assets/wave.svg';
import openEye from '../assets/openEye.png';
import closeEye from '../assets/closeEye.png';

const Register = ({ toggleForm }) => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [birth, setBirth] = useState("");
    const [role, setRole] = useState("USER");

    const [errors, setErrors] = useState([]);

    const [modal, setModal] = useState({ display: 'none' });
    const [modalOpacity, setModalOpacity] = useState({ display: 'none' });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateInputs()) {
            if (password === confirmPassword) {
                await cadastrar();
                limpar();
            } else {
                // Exibe um erro indicando que as senhas não coincidem
                setErrors([{ campo: "Confirmação de senha", mensagem: "As senhas não coincidem." }]);
                setModalOpacity({ display: "block" });
                setModal({ display: "block" });
            }
        } else {
            // Exibe um erro indicando que há campos obrigatórios vazios
            setErrors([{ campo: "Campos obrigatórios", mensagem: "Preencha todos os campos obrigatórios." }]);
            setModalOpacity({ display: "block" });
            setModal({ display: "block" });
        }
    };

    const validateInputs = () => {
        // Adicione verificações personalizadas para cada campo, se necessário
        if (!username.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !birth.trim()) {
            return false;
        }
        return true;
    };

    const cadastrar = async () => {
        const data = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            birth: birth,
            role: role,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            });

            if (response.status === 201) {
                alert("Cadastro bem-sucedido!");
            } else if (response.status === 400) {
                const errorData = await response.json();
                const errorArray = [];

                // Mapeia os erros recebidos do backend para um formato mais legível
                for (const fieldName in errorData) {
                    const errorMessage = errorData[fieldName];
                    errorArray.push({ fieldName, errorMessage });
                }

                // Exibe o modal de erro
                setModalOpacity({ display: "block" });
                setErrors(errorArray);
                setModal({ display: "block" });
            } else {
                console.log("Ocorreu um erro inesperado: " + response.status);
            }
        } catch (error) {
            console.log("Erro ao enviar a solicitação:", error);
            // Tratamento adicional de erro aqui, se necessário
        }
    };

    const closeModalOpacity = () => {
        setModalOpacity({ display: 'none' });
        setModal({ display: 'none' });
    };

    const limpar = () => {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBirth("");
    };

    const handleInputFocus = (labelId) => {
        const label = document.getElementById(labelId);
        label.classList.add('active');
    };

    const handleInputBlur = (labelId) => {
        const label = document.getElementById(labelId);
        const input = document.getElementById(labelId.replace('Label', '')); // Obtém o input associado ao label

        if (input && input.value.trim() !== '') {
            label.classList.add('active');
            return;
        }

        label.classList.remove('active');
    };

    return (
        <section className="sectionRegister">
            <article className="authArticle">
                <fieldset className="authFieldset">
                    <div className="imgFront"><img src={img} alt="authentication" /></div>
                    <form onSubmit={handleSubmit} className="authForm">
                        <div className="authField">
                            <label id="usernameLabel" className={username ? 'active' : ''} htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onMouseEnter={() => handleInputFocus('usernameLabel')}
                                onMouseLeave={() => handleInputBlur('usernameLabel')}
                            />
                        </div>
                        <div className="authField">
                            <label id="firstNameLabel" className={firstName ? 'active' : ''} htmlFor="firstName">
                                firstName
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onMouseEnter={() => handleInputFocus('firstNameLabel')}
                                onMouseLeave={() => handleInputBlur('firstNameLabel')}
                            />
                        </div>
                        <div className="authField">
                            <label id="lastNameLabel" className={lastName ? 'active' : ''} htmlFor="lastName">
                                lastName
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onMouseEnter={() => handleInputFocus('lastNameLabel')}
                                onMouseLeave={() => handleInputBlur('lastNameLabel')}
                            />
                        </div>
                        <div className="authField">
                            <label id="emailLabel" className={email ? 'active' : ''} htmlFor="email">
                                email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onMouseEnter={() => handleInputFocus('emailLabel')}
                                onMouseLeave={() => handleInputBlur('emailLabel')}
                            />
                        </div>
                        <div className="authField">
                            <label id="passwordLabel" className={password ? 'active' : ''} htmlFor="password">
                                password
                            </label>
                            <div className="togglePassword">
                                <span onClick={handleTogglePassword}>
                                    {showPassword ? <img src={openEye} alt="Open Eye" /> : <img src={closeEye} alt="Closed Eye" />}
                                </span>
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onMouseEnter={() => handleInputFocus('passwordLabel')}
                                onMouseLeave={() => handleInputBlur('passwordLabel')}
                            />
                        </div>
                        <div className="authField">
                            <label id="confirmPasswordLabel" className={confirmPassword ? 'active' : ''} htmlFor="confirmPassword">
                                Confirmar senha
                            </label>
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onMouseEnter={() => handleInputFocus('confirmPasswordLabel')}
                                onMouseLeave={() => handleInputBlur('confirmPasswordLabel')}
                            />
                        </div>
                        <div className="authField">
                            <legend>birth</legend>
                            <input
                                type="date"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </div>
                        <div className="btn">
                            <button type="submit">Register</button>
                            <a onClick={toggleForm}><span>Already registered? log in!</span></a>
                        </div>
                    </form>
                </fieldset>
                <div className="modal" style={{ display: modal.display }}>
                    <div className="errorModal">
                        <div className="errorIcon">
                            <img src={imgError} alt="Error" />
                            <h2>Erro!</h2>
                        </div>
                        <hr />
                        <div className="errorMessages">
                            {/* Mapeia e exibe os erros */}
                            {errors.map((error, index) => (
                                <div key={index}>
                                    <strong>{error.campo}</strong> {error.mensagem}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Modal de fundo */}
                <div className="modalOpacity" onClick={closeModalOpacity} style={{ display: modalOpacity.display }}></div>
            </article>
            <div className="WelcomeDescWave">
                <img src={wave} alt="" />
            </div>
        </section >
    );
};

export default Register;
