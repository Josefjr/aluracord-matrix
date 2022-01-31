import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
    console.log(props);
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['200']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

//Componente React
//function HomePage() {
// JSX
//    return (
//      <div>
//        <GlobalStyle/>
//        <Titulo tag="h2">Boas vindas de volta!</Titulo>
//        <h2>Discord - Alura Matrix</h2>
//        
//      </div>
//    ) 
//  }
// 
//  export default HomePage

export default function PaginaInicial() {
 
  const [username, setUsername] = React.useState("");
  const roteamento = useRouter();

  return (

    <>     
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[700],
          backgroundImage:
           "url(https://c.tenor.com/KjVxfRrrncUAAAAd/matrix.gif)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >    

        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            boxShadow: '8px 4px 20px 8px #008000',
            backgroundColor: appConfig.theme.colors.neutrals[900],
            opacity: '0.8',
          }}
        >
          {/* Formulário */}
          <Box            
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguem submeteu o form');
              // roteamento.push('/chat?username=' + username);
              roteamento.push(`/chat?username=${username}`); //pegar valor e jogar na url
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",              
            }}
          >
            <Titulo tag="h2">Sejam bem vindo<br/> Alura Matrix </Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function (event){
                console.log('usuario digitou', event.target.value);
                // Onde ta o Valor
                const valor = event.target.value;
                // Trocar o valor da variavel
                // atraves do react e avise quem precisa
                setUsername(valor);
              }}
              /> */}

            <TextField
              value={username}
              placeholder='Digite ID do GitHub'
              onChange={function (event){
                console.log('usuario digitou', event.target.value);                
                // Onde ta o Valor
                const valor = event.target.value;                             
                // Trocar o valor da variavel
                // atraves do react e avise quem precisa
                //setUsername(valor);
                if (username.length < 2) {
                  const valor = event.target.value;  
                  setUsername(valor);
                } else {
                  setUsername(valor);
                }
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />

            <Button
              type="submit"
              label="Entrar"
              disabled={username.length <= 2}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[600],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              boxShadow: '4px 4px 20px 4px #008000',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={username.length > 2
                ? `https://github.com/${username}.png`
                : `https://c.tenor.com/itjFesV8_RUAAAAi/soulja-boy-pepe.gif`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username || "Usuario não tomo a pilula"}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}