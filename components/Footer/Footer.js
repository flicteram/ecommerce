import styles from '../../styles/Footer.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function Footer(){
    const stylesIcons={
        fontSize:'30px',
        color:'rgb(214, 107, 19)',
        margin: '0px 5px',
        cursor:'pointer',
        '&:hover':{
            color:'rgb(150, 90, 19)'
        }
    }
    return(
        <footer className={styles.footerContainer}>
            <h4>Made by Alexandru Flicter</h4>
            <div>

                <a href='https://www.linkedin.com/in/alexandru-flicter-3b70ab220/'><LinkedInIcon sx={stylesIcons}/></a>
                <a href='https://www.facebook.com/profile.php?id=100009972224077'><FacebookIcon sx={stylesIcons}/></a>
                <a href='https://github.com/flicteram'><GitHubIcon sx={stylesIcons}/></a>
            </div>
        </footer>
    )
}