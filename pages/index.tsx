import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import styles from '../styles/components/Home.module.scss'
import Post from './post'
import { newListWorkspaceState } from '../api/recoil/workspacesState'

const Home: NextPage = () => {
  // const workspaces = useRecoilValue(newListWorkspaceState);
  return (
    <div className="main-container">
       main
    </div>
  )
}

export default Home
