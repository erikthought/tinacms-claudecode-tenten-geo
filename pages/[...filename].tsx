import { InferGetStaticPropsType } from 'next'
import { useTina } from 'tinacms/dist/react'
import { client } from '../tina/__generated__/client'
import Layout from '../components/Layout'
import LandingPage from '../components/LandingPage'

export default function DynamicPage(
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

export const getStaticProps = async ({ params }: any) => {
  const filename = params?.filename ? params.filename.join('/') : 'en'
  
  // Map routes to content files
  const contentMap: { [key: string]: string } = {
    'ja': 'ja.md',
    'zh-cn': 'zh-cn.md',
    'zh-tw': 'zh-tw.md',
    'ko': 'ko.md',
    'ar': 'ar.md'
  }

  const contentFile = contentMap[filename] || 'en.md'

  try {
    const { data, query, variables } = await client.queries.page({
      relativePath: contentFile,
    })

    return {
      props: {
        data,
        query,
        variables,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths = async () => {
  const pageListData = await client.queries.pageConnection()
  
  return {
    paths: [
      { params: { filename: ['ja'] } },
      { params: { filename: ['zh-cn'] } },
      { params: { filename: ['zh-tw'] } },
      { params: { filename: ['ko'] } },
      { params: { filename: ['ar'] } },
    ],
    fallback: false,
  }
}