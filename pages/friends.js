import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import ListGrid from '../src/components/ListGrid'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import { ListBoxWrapper } from '../src/components/ListBox'

export default function FriendsScreen(props) {
  const user = props.user;
  const friends = ['omariosouto', 'juunegreiros', 'peas'];

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
              Amigos
            </h1>

            <ul>
              {friends.slice(0, 6).map((item) => {
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