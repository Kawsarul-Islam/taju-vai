// Load AI url

const loadAiHub = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAI(data.data.tools);
}

const displayAI = aiHub =>{
    const aiContainer = document.getElementById('ai-container');

    const showALl = document.getElementById('show-all');
    if(aiHub.length > 6){
        aiHub = aiHub.slice(0 , 6)
        showALl.classList.remove('d-none');
    }
    else{
        showALl.classList.add('d-none');
    }

    aiHub.forEach(ai =>{
        // creating a dynamic div container
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card p-2">
            <img src="${ai.image}" class="card-img-top rounded" alt="..." height="220" >
        <div class="card-body">
                <h5>Features</h5>
                <ol> 
                <li>${ai.features[0] ? ai.features[0] : 'No Data Found'}</li> 
                <li>${ai.features[1] ? ai.features[1] : 'No Data Found'}</li> 
                <li>${ai.features[2] ? ai.features[2] : 'No Data Found'}</li> 
                </ol>
                <hr>

            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="card-title mb-3">${ai.name ? ai.name : 'No Title Found'}</h5>
                    <p class="ml-5"><i class="fa-solid fa-calendar-days"></i> ${ai.published_in ? ai.published_in : 'No Date Found'}</p>
                </div>
               
                <div class="mt-5">
                <button onclick="loadAi('${ai.id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aiDetailsModal"><i class="fa-solid fa-arrow-right-long"></i></button>
                </div>
                
                
            </div>
            
        </div>
        </div>
        `;
        aiContainer.appendChild(aiDiv);
    })
};

// show card details
const loadAi = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiDetails(data.data);
};

const displayAiDetails = aiDetails => {
    console.log(aiDetails)
   const modalBody = document.getElementById('modal-body');
   modalBody.innerHTML = `
   <div class="d-flex justify-content-between gap-2  ">
   <div class="bg-danger-subtle">
        <h4>${aiDetails.description ? aiDetails.description : 'No Description Found'}</h4>
    <div class="row row-cols-1 row-cols-md-3  text-center mt-3 justify-content-center gap-3">
    <div class="col bg-light-subtle rounded w-25">
        <h5 class="mt-3 text-success fs-6 text">${aiDetails.pricing[0].price}</h5>
        <h5 class="text-success fs-6 text">${aiDetails.pricing[0].plan}</h5>
    </div>
    <div class="col bg-light-subtle rounded w-25">
        <h5 class="mt-3 text-warning fs-6 text">${aiDetails.pricing[1].price ? aiDetails.pricing[1].price : 'Free Of Cost/Pro'}</h5>
        <h5 class="text-warning fs-6 text">${aiDetails.pricing[1].plan}</h5>
    </div>
    <div class="col bg-light-subtle rounded w-25">
        <h5 class="mt-3 text-danger fs-6 text">${aiDetails.pricing[2].price}</h5>
        <h5 class="text-danger fs-6 text">${aiDetails.pricing[2].plan}</h5>
    </div>
    
    </div>

    <div class="d-flex justify-content-between" >
        <div>
            <h4 class="mt-3 mb-4">Features</h4>
            <ul> 
            <li class="fs-6 text">${aiDetails.features[1].feature_name ? aiDetails.features[1].feature_name : 'No Data Found'}</li> 
            <li class="fs-6 text">${aiDetails.features[2].feature_name ? aiDetails.features[2].feature_name : 'No Data Found'}</li> 
            <li class="fs-6 text">${aiDetails.features[3].feature_name ? aiDetails.features[3].feature_name : 'No Data Found'}</li> 
            </ul>
        </div>
        <div>
            <h4 class="mt-3 mb-4">Integrations</h4>
            <ul> 
                <li class="fs-6 text">${aiDetails.integrations[0] ? aiDetails.integrations[0] : 'No Data Found'}</li> 
                <li class="fs-6 text">${aiDetails.integrations[1] ? aiDetails.integrations[1] : 'No Data Found'}</li> 
                <li class="fs-6 text">${aiDetails.integrations[2] ? aiDetails.integrations[2] : 'No Data Found'}</li> 
            </ul>
        </div>
    </div>
   </div>

   <div class="w-75">
       <img class="w-100"  src="${aiDetails.image_link[0] ? aiDetails.image_link[0] : 'No Image Found'}" class="card-img-top rounded" alt="..." height="200">
       <h5 class="fs-4 text text-center mt-4">
            ${aiDetails.input_output_examples[0].input ? aiDetails.input_output_examples[0].input : 'No Input Found'}
       </h5>
       <h4 class="fs-6 text text-center text-secondary">
            ${aiDetails.input_output_examples[1].output ? aiDetails.input_output_examples[1].output : 'No Output Found'}
       </h4>
   </div>
   </div>
   `;
}