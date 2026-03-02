import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'
const supabase = createClient('https://fizyiauptqctsmhgtbdj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpenlpYXVwdHFjdHNtaGd0YmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzcwMzUsImV4cCI6MjA4NzQxMzAzNX0.UfG3ftKYem5vJeQ_y0tyRgy4ewJl5Ob4J3ZI20ceSRc')


async function upload() {
    let image = document.getElementById("profile_image");
    let file = image.files[0];
    let filePath = String(Date.now())

    if(file) {
        const { data, error } = await supabase.storage
            .from("user_profiles")
            .upload(filePath, file)
        if (error) {
            console.log(error);
        }
        alert("image uploaded")
        viewImage(filePath)

    } else {
        alert("file not uplaod")
    }
}


window.upload = upload;


// get file
async function viewImage(elem) {
    let view = document.getElementById("userProfile");

    const { data, error } = await supabase
        .storage
        .from("user_profiles")
        .getPublicUrl(elem)



    if (error) {
        console.log(error);
    }
    console.log(view.src = data.publicUrl)
}
window.viewImage = viewImage;