Criar projeto React
### npx create-react-app crud

Acessar diretorio 
### cd crud

Rodar o projeto React
### npm start OR yarn start

### const [data, setData] = useState(['']);

    const getUsers = async () => {
        fetch("http://localhost/crud/index.php")
            .then((response) => response.json())
            .then((responseJson) => (
                setData(responseJson)
            ));
    }

    useEffect(() => {
        getUsers();
    }, [])