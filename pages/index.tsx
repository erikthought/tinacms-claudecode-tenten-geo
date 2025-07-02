import { InferGetStaticPropsType } from 'next'
import { useTina } from 'tinacms/dist/react'
import { client } from '../tina/__generated__/client'
import Layout from '../components/Layout'
import LandingPage from '../components/LandingPage'

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  return (
    <Layout 
      title={data.page.title}
      description={data.page.description}
      language={data.page.language}
    >
      <LandingPage data={data.page} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: 'en.md',
  })

  return {
    props: {
      data,
      query,
      variables,
    },
  }
}