import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fav-photos',
  templateUrl: './fav-photos.component.html',
  styleUrls: ['./fav-photos.component.css']
})
export class FavPhotosComponent implements OnInit {
  photosTitle = 'Pictures of Silkmoths';
  image1 = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2019%2F07%2Fgettyimages-128549064-2000.jpg';
  image2 = 'https://i.pinimg.com/originals/d9/56/ac/d956ac62028d4e9c5190d89ae5b6c36f.jpg';
  image3 = 'https://i.pinimg.com/736x/2e/41/89/2e418952359305053b8df0495b18f9d3.jpg';

  constructor() { }

  ngOnInit() {
  }

}