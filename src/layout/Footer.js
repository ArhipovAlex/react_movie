import './Footer.css';

function Footer()
{
    return(
        <div className='footer'>
            Copyright &#169; - {new Date().getFullYear()}
        </div>
    )
}

export default Footer;