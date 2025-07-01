import { getServerApiCaller } from '@/trpc/server';
import React from 'react'

type TopicsPageProps = {
  params: { id: string };
};

export default async function TopicsPage({params}: TopicsPageProps) {
    const caller = await getServerApiCaller();    
    //const profile = await caller.topic.getById({ id: params.id })
    
    return (
        <div>TopicsPage</div>
    )
}
