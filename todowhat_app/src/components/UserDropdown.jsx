import Image from "next/image"

const UserDropdown = ({ username }) => {
  return (
    <div className="dropdown">
      <a className="btn btn-primary dropdown-toggle" role="button" href="#" data-bs-toggle="dropdown" aria-expanded="false">
        <Image src="/assets/User.png" width={20} height={20}/>
        { username }
      </a>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Change password</a></li>
        <li><a className="dropdown-item" href="#">Log out</a></li>
      </ul>
    </div>
  )
}

export default UserDropdown