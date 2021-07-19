import React from 'react'
import Box from '../Box'

export default function Forms({ index, user }) {
  const [communities, setCommunities] = React.useState([]);
  const [declarations, setDeclarations] = React.useState([]);

  switch (index) {
    case 0:
      return (
        <Box>
          <h2 className="subTitle">Digite as informações da comunidade</h2>

          <form id="communityForm" onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();

            const data = new FormData(e.target);
            const community = {
              title: data.get('title'),
              imageUrl: data.get('image'),
              creatorSlug: user
            };

            fetch('/api/community', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(community)
            })
              .then(async (response) => {
                const data = await response.json();
                const updatedCommunities = [...communities, data.recordCreated];
                setCommunities(updatedCommunities);
              })
          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>

            <div>
              <input
                placeholder="Digite a URL de uma imagem para a capa"
                name="image"
                aria-label="Digite a URL de uma imagem para a capa"
                type="text"
              />
            </div>

            {/* <div>
                  <input
                    placeholder="Digite um link para a comunidade"
                    name="link"
                    aria-label="Digite um link para a comunidade"
                    type="text"
                  />
                </div> */}

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      )
    case 1:
      return (
        <Box>
          <h2 class="subTitle">Deixe seu depoimento</h2>

          <form id="declarationForm" onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();

            const data = new FormData(e.target);
            const declarationObj = {
              declaration: data.get('declaration'),
              user: data.get('usser')
            };

            fetch('/api/declaration', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(declarationObj)
            })
              .then(async (response) => {
                const data = await response.json();
                const updatedDeclarations = [...declarations, data.recordCreated];
                setDeclarations(updatedDeclarations);
              })
          }}>

            <div>
              <input
                placeholder="Digite seu nome de usuário"
                name="user"
                aria-label="Digite seu nome de usuário"
                type="text"
              />
            </div>

            <div>
              <input
                placeholder="Digite seu depoimento"
                name="declaration"
                aria-label="Digite seu depoimento"
                type="text"
              />
            </div>

            <button>
              Enviar
            </button>

          </form>
        </Box>
      )
    default:
      return
  }
}