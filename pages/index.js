import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import ProfileSidebar from '../src/components/ProfileSidebar'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import Forms from '../src/components/Forms'

function ProfileRelationsBox(args) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {args.title} ({args.count})
      </h2>

      <ul>
        {args.items.slice(0, 6).map((item) => {
          return (
            <li key={item.id}>
              <a href={item.html_url} target="blank">
                <img src={`${item.html_url}.png`} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const user = props.user;
  const favorites = ['omariosouto', 'juunegreiros', 'peas'];
  const [communities, setCommunities] = React.useState([]);
  const [declarations, setDeclarations] = React.useState([]);
  const [selectedForm, selectForm] = React.useState(0);
  const [followersCount, setFollowersCount] = React.useState(0);
  const [userName, setName] = React.useState('');
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(async function () {

    fetch(`https://api.github.com/users/${user}/followers`)
      .then(async function (response) {
        const followers = await response.json();
        setFollowers(followers);
      })

    fetch(`https://api.github.com/users/${user}`)
      .then(async function (response) {
        const data = await response.json();
        setFollowersCount(data.followers);
        setName(data.name);
      })

    fetch('https://graphql.datocms.com/', {
      method: "POST",
      headers: {
        "Authorization": "ced7b39ce56a14293f6c78b13556e9",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      } `})
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setCommunities(response.data.allCommunities);
      })

    fetch('https://graphql.datocms.com/', {
      method: "POST",
      headers: {
        "Authorization": "ced7b39ce56a14293f6c78b13556e9",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "query": `query {
        allDeclarations {
          id
          declaration
          user
        }
      } `})
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const userDeclarations = response.data.allDeclarations.filter(function (item) {
          return user === item.user;
        })
        setDeclarations(userDeclarations);
      })

  }, []);

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a), {userName}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>

            <h2 className="subTitle">O que você deseja fazer?</h2>

            <button onClick={() => {
              selectForm(0)
            }}>
              Criar comunidade
            </button>

            <button style={{ marginLeft: '10px' }} onClick={() => {
              selectForm(1)
            }}>
              Escrever Depoimento
            </button>

          </Box>

          <Forms index={selectedForm} user={user} />

          <Box>
            <h2 className="subTitle">Depoimentos</h2>

            <ul style={{
              backgroundColor: '#F4F4F4',
              padding: '14px 16px',
              borderRadius: '10px'
            }}>
              {declarations.slice(0, 6).map((item) => {
                return (
                  <li key={item.id} style={{
                    listStyleType: 'none',
                    borderBottom: '1px solid rgb(225, 225, 225)'
                  }}>
                    <div style={{
                      marginBottom: '15px',
                      marginTop: '15px'
                    }}>
                      <p style={{ fontSize: '18px' }}>{item.declaration}</p>
                      <p style={{ fontSize: '12px' }}>
                        Enviado por <a
                          href={`https://github.com/${item.user}`}
                          target="blank"
                          style={{ textDecoration: 'none' }}
                        >
                          @{item.user}
                        </a></p>
                    </div>
                  </li>
                )
              })}
            </ul>

          </Box>

        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({favorites.length})
            </h2>

            <ul>
              {favorites.slice(0, 6).map((item) => {
                return (
                  <li key={item}>
                    <a href={`https://github.com/${item}`} target="blank">
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.slice(0, 6).map((item) => {
                return (
                  <li key={item.id}>
                    <a>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={followers} count={followersCount} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;

  if (!githubUser) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
  //   headers: {
  //     Authorization: token
  //   }
  // })
  //   .then((response) => response.json())

  // if (!isAuthenticated) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {
      user: githubUser
    }
  }
}