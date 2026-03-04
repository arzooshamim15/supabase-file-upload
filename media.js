import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://fizyiauptqctsmhgtbdj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpenlpYXVwdHFjdHNtaGd0YmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzcwMzUsImV4cCI6MjA4NzQxMzAzNX0.UfG3ftKYem5vJeQ_y0tyRgy4ewJl5Ob4J3ZI20ceSRc')


async function addMedia() {
    let media = document.getElementById("uploadFile");
    let render = media.files[0];
    let filePath = `${Date.now()}`
    const { data, error } = await supabase
        .storage
        .from("media files")
        .upload(filePath, render)

    if (error) {
        console.log("error aya hey", error)
        return
    }
    getimage(filePath)
    console.log("data add ho gaya", data)


}


async function getimage(params) {
    const { data, error } = await supabase
        .storage
        .from('media files')
        .getPublicUrl(params)
    if (error) {
        console.log(error)
        alert("error message")
    }
    document.getElementById("profileimage").src = data.publicUrl;
//    loadImages()
}

// Get All Images From Bucket
async function loadImages() {
    const { data, error } = await supabase.storage
        .from("media files")
        .list("", { limit: 100 });
    if (error) {
        console.log(error)
        alert("error message")
    }
    const container = document.getElementById("imageContainer");
    container.innerHTML = "";

    data.forEach(async (fileser) => {
        const { data, error } = await supabase
            .storage
            .from('media files')
            .getPublicUrl(fileser.name)

        container.innerHTML += `
        <div class="image-card">
    <img src="${data.publicUrl}" alt="render" id="profileimage" width="300px" height="300px">
        <p>${fileser.name}</p>
        <button onclick="deleteImage('${fileser.name}')">Delete</button>
        <button onclick="renameImage('${fileser.name}')">Edit</button>
      </div>
                `;


                
                
                if(error){
                    console.log("error aya hey",error);
                    
                }
            });
            

}


window.loadImages = loadImages
window.getimage = getimage
window.addMedia = addMedia