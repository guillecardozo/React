import '../../App.css'

const FooterDashboard = () => {
    return (
      <div>
        <footer className="pt-5 d-flex justify-content-between" id="footer">
                <span>Copyright © 2022-2025 <a href="s#">CryptoTransact</a></span>
                <ul className="nav m-0">
                    <li className="nav-item">
                        <a className="nav-link text-secondary" aria-current="page" href="s#">Privacy Policy</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-secondary" href="s#">Terms and conditions</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-secondary" href="s#">Contact</a>
                    </li>
                </ul>
                <p><em><strong>By Guillermo Cardozo</strong></em></p>
            </footer>
      </div>
    )
  }
  
  export default FooterDashboard