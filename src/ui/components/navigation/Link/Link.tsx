import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link"; // Link é export default podemos renomear de cara
import Router from "next/router";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  ButtonProps,
} from "@mui/material";

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  mui?: MuiLinkProps | ButtonProps;
  next?: NextLinkProps;
  Component?: React.ElementType;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  mui,
  next,
  Component = MuiLink,
  ...props
}) => {
  const isNextEnv = Boolean(Router.router);

  return isNextEnv ? (
    <NextLink href={href} passHref {...next}>
      <Component {...mui} {...props}>
        {children}
      </Component>
    </NextLink>
  ) : (
    <Component href={href} {...mui} {...props}>
      {children}
    </Component>
  );
};

export default Link;
