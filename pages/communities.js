import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import ListGrid from '../src/components/ListGrid'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import { ListBoxWrapper } from '../src/components/ListBox'

export default function CommunitiesScreen(props) {
  const user = props.user;
  const [communities, setCommunities] = React.useState([]);

  React.useEffect(async function () {
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

  }, []);

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <ListGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

        <div className="listArea" style={{ gridArea: 'listArea' }}>
          <ListBoxWrapper>
            <h1 className="title">
              Comunidades
            </h1>

            <ul>
              {communities.slice(0, 6).map((item) => {
                return (
                  <li key={item.id}>
                    <a href={item.link} target="blank">
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ListBoxWrapper>
        </div>
      </ListGrid>
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

  return {
    props: {
      user: githubUser
    }
  }
}