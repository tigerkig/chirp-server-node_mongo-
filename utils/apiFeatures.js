class ApiFeatures {
   constructor(query , queryString){
      this.query = query;
      this.queryString = queryString;
   }

   search(){
      const keyword = this.queryString.keyword ? {
         name : {
            $regex : this.queryString.keyword,
            $options : 'i'
         }
      } : {}
      this.query = this.query.find({ ...keyword });
      return this;
   }

  

   filter(){
      const queryStringCopy = { ...this.queryString };
      const removeFields = ['page' , 'limit' , 'sort' , 'keyword'];
      removeFields.map(field => delete queryStringCopy[field]);

      let queryStr = JSON.stringify(queryStringCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , key => `$${key}`);
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }
  

   paginate(perPage){
      const page = this.queryString.page || 1;
      const skip = perPage * (page - 1);
      this.query = this.query.find().skip(skip).limit(perPage);
      return this;
   }

}

module.exports = ApiFeatures;