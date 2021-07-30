import React, { useState, useEffect } from "react";
import { Link as GatsbyLink, useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Title from "../assets/images/the_icarus_luminari.png";
import "../assets/styles/mobile-nav.css";

//import { getElementById } from "min-document";



const useStyles = makeStyles((theme) => ({
  toolbar: {
    position: "fixed",
    top: "0",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    zIndex: "2",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarsecondary: {
    justifyContent: "space-around",
    overflowX: "auto",
    width: "100%",
    backgroundColor: theme.palette.background.default,
    opacity: "1",
    position: "fixed",
    top: "60px",
    zIndex: "1",
    boxShadow: "2px 2px 5px grey",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  divider: {
    background: theme.palette.text.secondary,
    position: "fixed",
    zIndex: "2",
    top: "100px",
  },
  "@media (max-width: 590px)": {
    wrapper: {
      position: "fixed",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      zIndex: "0",
      opacity: "0.3",
    },
    toolbar: {
      backgroundColor: theme.palette.background.header,
      boxShadow: "2px 2px 5px grey",
      zIndex: "2",
    },
    toolbarTitle: {
      display: "flex",
      justifyContent: "flex-start",
      width: "10px",
      backgroundColor: theme.palette.background.header,
    },
    toolbarsecondary:{
      display: "none",
      backgroundColor: theme.palette.background.header,
      opacity: "1",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      position: "fixed",
      top: "56px",
      zIndex: "1",
    },
    navbutton:{
      display:"column",
      width: "15%",
    },
    hamburger: {
      display:"block",
      backgroundColor: theme.palette.text.secondary,
      width: "40px",
      height: "6px",
      borderRadius: "5px",
      margin: "7px 0px",

    },
    divider: {
      marginTop: theme.spacing(7),
      position: "fixed",
      display: "none",
    },
    box:{
      boxShadow: "none",
      width: "40px",
    },

  },
}));

//see gatsby-node.js
const normalizeURL = (url) => encodeURIComponent(url.replace(/ /g, "-").toLowerCase());

/**
 * Renders a nav link (Gatsby Link)
 * Props:
 * @children   rendered as visible text
 * @className  passed as the underlying Link's className
 * @to         the local url to go to
 */
const NavLink = (props) => (
  <Link
    to={props.to}
    component={GatsbyLink}
    color="textSecondary"
    noWrap
    variant="h5"
    className={props.className}
  >
    {props.children}
  </Link>
);

const Header = ({ title, toggleTheme }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          navbar {
            links
            tags
          }
        }
      }
    }
  `);
  const query = window.matchMedia('(max-width: 590px)');
  let [NavDisplay, setNavDisplay] = useState("none");
  useEffect(() => {
    let navbar = document.getElementById("toolbarsecondary");
    let wrapper = document.getElementById("wrapper");
 
    if(query.matches){
      navbar.style.display = NavDisplay;
      wrapper.style.display = NavDisplay;
    }
  });
  const changenav = () =>{
    let navbar = document.getElementById("toolbarsecondary");
    if(query.matches){
      navbar.style.display = "none";
      setNavDisplay("none");
    }else{
      navbar.style.display = "flex";
    }
  }
  query.addListener(changenav);

  

  const links = site.siteMetadata.navbar.links;
  const tags = site.siteMetadata.navbar.tags;
  const classes = useStyles();
 

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h3"
          color="textSecondary"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link
            to="/"
            component={GatsbyLink}
            color="inherit"
            className={classes.link}
          >
            <img src={Title} alt={title} />
          </Link>
        </Typography>
        <Typography
          variant="button"
          color="secondary"
          align="right"
          noWrap
          className={classes.navbutton}
          id = "navbutton"
          onClick = {() => {
              (NavDisplay === "none" ? setNavDisplay("flex") : setNavDisplay("none"));
            }}
        >
        <Typography id = "box" className = {classes.box}
          
         onMouseEnter = {()=>{
           document.getElementById("box").style.boxShadow="20px 20px 70px 15px grey"       }
         }
         onMouseLeave = {()=>{
          document.getElementById("box").style.boxShadow="none";  
         }}
    
        
        >
          <Typography
          className={classes.hamburger}
          id = "topline"
          >
          </Typography>
          <Typography
          className={classes.hamburger}
          id = "middleline"
          >
          </Typography>
          <Typography
          className={classes.hamburger}
          id = "bottomline"
          >
          </Typography>
        </Typography>
      </Typography>
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarsecondary}
        id = "toolbarsecondary"
      >
        {tags.map((link) => (
          <NavLink 
            className={classes.toolbarLink} 
            to={`/tag/${normalizeURL(link)}`}
            key={link}
          >
            {link}
          </NavLink>
        ))}
        {links.map((link) => (
          <NavLink 
            className={classes.toolbarLink} 
            to={`/${normalizeURL(link)}`}
            key={link}
          >
            {link}
          </NavLink>
        ))}
        <IconButton onClick={toggleTheme}>
          <Brightness6Icon variant="outline" color="secondary" />
        </IconButton>
      </Toolbar>
      <Typography
        variant= "button"
        className = {classes.wrapper}
        id = "wrapper"
        onClick = {() => {
          (NavDisplay === "none" ? setNavDisplay("flex") : setNavDisplay("none"));}}
      ></Typography>
    </>
  );
};
export default Header;
