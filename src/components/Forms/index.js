import React from 'react'
import Box from '../Box'

export default function Forms({ index, user, communities, setCommunities, declarations, setDeclarations }) {
  const [community, setCommunity] = React.useState({ title: '', imageUrl: '', creatorSlug: user });
  const [declaration, setDeclaration] = React.useState({ user: '', declaration: '' });

  switch (index) {
    case 0:
      return (
        <Box>
          <h2 className="subTitle">Digite as informações da comunidade</h2>

          <form id="communityForm" onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();

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
                setCommunity({ title: '', imageUrl: '', creatorSlug: user });
              })
          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                value={community.title}
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                onChange={(e) => {
                  setCommunity({ title: e.target.value, imageUrl: community.imageUrl, creatorSlug: user })
                }}
              />
            </div>

            <div>
              <input
                placeholder="Digite a URL de uma imagem para a capa"
                value={community.imageUrl}
                aria-label="Digite a URL de uma imagem para a capa"
                type="text"
                onChange={(e) => {
                  setCommunity({ title: community.title, imageUrl: e.target.value, creatorSlug: user })
                }}
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      )
    case 1:
      return (
        <Box>
          <h2 className="subTitle">Deixe seu depoimento</h2>

          <form id="declarationForm" onSubmit={function handleCreateCommunity(e) {
            e.preventDefault();

            fetch('/api/declaration', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(declaration)
            })
              .then(async (response) => {
                const data = await response.json();
                const updatedDeclarations = [...declarations, data.recordCreated];
                setDeclarations(updatedDeclarations);
                setDeclaration({ user: '', declaration: '' });
              })
          }}>

            <div>
              <input
                placeholder="Digite seu nome de usuário"
                value={declaration.user}
                aria-label="Digite seu nome de usuário"
                type="text"
                onChange={(e) => {
                  setDeclaration({ user: e.target.value, declaration: declaration.declaration })
                }}
              />
            </div>

            <div>
              <input
                placeholder="Digite seu depoimento"
                value={declaration.declaration}
                aria-label="Digite seu depoimento"
                type="text"
                onChange={(e) => {
                  setDeclaration({ user: declaration.user, declaration: e.target.value })
                }}
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