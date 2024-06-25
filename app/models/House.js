export class House {
  constructor(data) {
    this.imgUrl = data.imgUrl;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.id = data.id;
    this.year = data.year;
    this.price = data.price;
    this.description = data.description;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.creatorId = data.creatorId;
    this.creator = data.creator;
  }

  get cardHTMLTemplate() {
    return `
            <div class="col-12 mb-3">
            <div class="car-card shadow" style="border-color: black;">
                <div class="row">
                    <div class="col-12 col-md-4 ">
                        <img class="img-fluid bg-dark"
                            src="${this.imgUrl}"
                            alt="House">
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="p-3">
                            <h2>${this.creator}</h2>
                            <h2>$${this.price}</h2>
                            
                            <h4>Bedrooms: ${this.bedrooms}</h4>
                            <h4>Bathrooms: ${this.bathrooms}</h4>
                            <h5>
                                Description: ${this.description}
                            </h5>
                            <div class="text-end">
                                <button onclick="app.HousesController.destroyHouse('${this.id}')"
                                    class="btn btn-outline-danger" type="button">Delete House</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
  }
}

// {
//     "_id": "645d60f381faf24223ae886b",
//     "bedrooms": 3,
//     "bathrooms": 2,
//     "levels": 2,
//     "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
//     "year": 2003,
//     "price": 230000,
//     "description": "Super sick house",
//     "creatorId": "63f7d6202d1cf882287f12e2",
//     "createdAt": "2023-05-11T21:41:07.979Z",
//     "updatedAt": "2023-05-11T21:41:07.979Z",
//     "__v": 0,
//     "creator": {
//       "_id": "63f7d6202d1cf882287f12e2",
//       "name": "Charles Francis Xavier",
//       "picture": "https://media.tumblr.com/73b6bbb5a253780cfa957f4afd8d9e86/tumblr_inline_mqe0j8cDgp1qz4rgp.gif",
//       "id": "63f7d6202d1cf882287f12e2"
//     },
//     "id": "645d60f381faf24223ae886b"
//   },
