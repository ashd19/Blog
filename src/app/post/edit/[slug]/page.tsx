function EditPostPage(
  {params}
  : {params: {slug:string}}

) {
    return ( 
        <div>
            This is Edit Post Page no : {params.slug} 
        </div>
     );
}

export default EditPostPage;