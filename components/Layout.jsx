import Head from 'next/head'
import styles from '../styles/Layout.module.css'

export default function Layout({ children, title, description }) {
  return (
    <div className={styles.container}>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
        </Head>

        <main>{children}</main>2
    </div>
  )
}

Layout.defaultProps = {
    title: "Star Wars",
    description: "Description"
}