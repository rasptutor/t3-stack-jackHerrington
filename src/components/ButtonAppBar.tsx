"use client"

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthButton } from "./AuthButton";
import { useEffect } from 'react';

export default function ButtonAppBar() {
    const { data: session, status } = useSession();
      const router = useRouter();
    
      useEffect(() => {
        if (status !== "authenticated") {
          router.push("/"); // 🔁 client-side redirect
        }
      }, [status, router]);


    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <div className="flex-1 pl-5 text-3xl font-bold">
                    <p>Notes for {session?.user.name}</p>       
                </div>
            </Typography>
            <AuthButton session={session} />
            </Toolbar>
        </AppBar>
        </Box>
    );
}
