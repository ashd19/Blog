function CreatePostPage({params}:{
    params :{slug:string}
}) {
    return ( 
        <div>
    This is Post no {params.slug} 
        </div>
     );
}

export default CreatePostPage;