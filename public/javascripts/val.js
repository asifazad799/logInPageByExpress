$.validator.addMethod("Email", function (value, element) {
    return this.optional(element) || value == value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);},'Enter a valid email'
    );
$("#subform").validate({
    rules:{
        email:{
            required:true,
            Email:true
        },
        password:{
            required:true,
        }
    },
    
})
