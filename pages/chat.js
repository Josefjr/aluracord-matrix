import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, {useState} from 'react';
import appConfig from '../config.json';
import { useRouter, useEffect } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwMzAzNSwiZXhwIjoxOTU4ODc5MDM1fQ.DEp5m41rm-eFFalKy_11K7RZiHXe9M8h1xOFJ-lazLs';
const SUPABASE_URL = 'https://kgndrlhfleggruiexhqp.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function ChatPage() {
    //identificar usuario
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
    // campo para o usuario digitar a mensagem
  const [mensagem, setMensagem] = React.useState('');
  const [listaDeMensagens, setListaDeMensagens] = React.useState([
    
  ]);

  React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        //console.log('Dados da consulta:', data);
        setListaDeMensagens(data);
      });

      const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
        console.log('Nova mensagem:', novaMensagem);
        console.log('listaDeMensagens:', listaDeMensagens);        
        setListaDeMensagens((valorAtualDaLista) => {
          console.log('valorAtualDaLista:', valorAtualDaLista);
          return [
            novaMensagem,
            ...valorAtualDaLista,
          ]
        });
      });
  
      return () => {
        subscription.unsubscribe();
      }

  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data);
        
      });

    setMensagem('');
  }

  function Player () {
    const [playerState, setPlayerState] = useState({
      playing: false,
    });
  
    function toggleVideoPlay () {
      setPlayerState({
        ...playerState,
        playing: true,
      })
  
    }
  
    return (
      
      <div className="videoWrapper">
        <video
        src={videoURL}
        poster="https://kanto.legiaodosherois.com.br/w1200-h628-cfill/wp-content/uploads/2021/12/legiao_bw0fEnN3UAdh.png.jpeg"
        />        
        <div className="controls">
        <button onClick={toggleVideoPlay}>
          {playerState.playing ? "Pause" : "Play"} 
        </button>
        <imput
          type="range"
          min="0"
          max="100"
        />
        <select>
          {[1, 2, 3].map(speed => (
            <option
              key={`speedChange_${speed}`}
              >
                 {speed}
              </option>
          ))}
        </select>        
      </div>
      </div>
    );
  }
  return (
    <Box
      styleSheet={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'right',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://c.tenor.com/KjVxfRrrncUAAAAd/matrix.gif)`,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
        padding: '12px',
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: "99%",
          maxHeight: '95vh',
          padding: '32px',               
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',            
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',              
            }}
          >
            <TextField
                //Digitar a mensagem
              value={mensagem}
                //Recebe a mensagem e grava
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
                //Tecla necessaria para enviar a mensagem
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            {/* Botao de enviar */}
            <Button 
              disabled={!mensagem}
              onClick={() => {
                if(mensagem.trim() !== '') handleNovaMensagem(mensagem)
                else setMensagem('');
              }}
              iconName="paperPlane"
              rounded="none"
              buttonColors={{
                contrastColor: `${appConfig.theme.colors.neutrals[1000]}`,
                mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                mainColorLight: `${appConfig.theme.colors.neutrals[900]}`,
                mainColorStrong: `${appConfig.theme.colors.neutrals[100]}`
              }}
              styleSheet={{
                borderRadius: '50%',
                padding: '0 3px 0 0',
                minWidth: '50px',
                minHeight: '50px',
                fontSize: '20px',
                margin: '0 8px',
                lineHeight: '0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            />

            {/* Botao de figurinhas usando um CallBack*/}
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                handleNovaMensagem(':sticker: ' + sticker);
              }}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ 
          width: '100%', 
          marginBottom: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Sair'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  //console.log(props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '4px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >

            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">
                {mensagem.de}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>
            </Box>
            {/* [Declarativo] */}
            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
            {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />
              )
              : (
                mensagem.texto
              )}
            {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
            {/* {mensagem.texto} */}
          </Text>
        );
      })}
    </Box>
  )
}