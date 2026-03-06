import List "mo:core/List";

module {
  type OldPortfolio = {
    aboutText : Text;
    phone : Text;
    linkedIn : Text;
    instagram : Text;
    profilePhotoUrl : Text;
    resumeUrl : Text;
  };

  type OldActor = {
    portfolio : ?OldPortfolio;
    username : ?Text;
  };

  public type OldContact = {
    instagram : Text;
    linkedin : Text;
    phone : Text;
  };

  public type OldProject = {
    id : Text;
    title : Text;
    description : Text;
    fileBlobKey : ?Text;
  };

  public type OldResume = {
    blobKey : Text;
    filename : Text;
  };

  type NewActor = {
    aboutText : Text;
    profilePhoto : ?Text;
    contact : OldContact;
    resume : ?OldResume;
    projects : List.List<OldProject>;
    visitors : List.List<Text>;
  };

  public func run(_old : OldActor) : NewActor {
    let defaultContact : OldContact = {
      instagram = "";
      linkedin = "";
      phone = "";
    };

    {
      aboutText = "";
      profilePhoto = null;
      contact = defaultContact;
      resume = null;
      projects = List.empty<OldProject>();
      visitors = List.empty<Text>();
    };
  };
};
