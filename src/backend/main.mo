import MixinStorage "blob-storage/Mixin";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type Contact = {
    instagram : Text;
    linkedin : Text;
    phone : Text;
  };

  type Project = {
    id : Text;
    title : Text;
    description : Text;
    fileBlobKey : ?Text;
  };

  type Resume = {
    blobKey : Text;
    filename : Text;
  };

  var aboutText : Text = "";
  var profilePhoto : ?Text = null;
  var contact : Contact = {
    instagram = "";
    linkedin = "";
    phone = "";
  };
  var resume : ?Resume = null;
  let projects = List.empty<Project>();
  let visitors = List.empty<Text>();

  func isValidText(text : Text) : Bool {
    text.trim(#char ' ').size() > 0;
  };

  public shared ({ caller }) func recordVisitor(username : Text) : async () {
    if (not isValidText(username)) {
      Runtime.trap("Username cannot be empty or whitespace only");
    };
    visitors.add(username);
  };

  public query ({ caller }) func getVisitors() : async [Text] {
    visitors.toArray();
  };

  public shared ({ caller }) func updateAbout(text : Text) : async () {
    if (not isValidText(text)) {
      Runtime.trap("About text cannot be empty or whitespace only");
    };
    aboutText := text;
  };

  public query ({ caller }) func getAbout() : async Text {
    aboutText;
  };

  public shared ({ caller }) func updateContact(instagram : Text, linkedin : Text, phone : Text) : async () {
    if (not isValidText(instagram) or not isValidText(linkedin) or not isValidText(phone)) {
      Runtime.trap("Contact details cannot be empty or whitespace only");
    };
    contact := { instagram; linkedin; phone };
  };

  public query ({ caller }) func getContact() : async Contact {
    contact;
  };

  public shared ({ caller }) func setProfilePhoto(blobKey : Text) : async () {
    if (not isValidText(blobKey)) {
      Runtime.trap("Blob key cannot be empty or whitespace only");
    };
    profilePhoto := ?blobKey;
  };

  public query ({ caller }) func getProfilePhoto() : async ?Text {
    profilePhoto;
  };

  public shared ({ caller }) func setResume(blobKey : Text, filename : Text) : async () {
    if (not isValidText(blobKey) or not isValidText(filename)) {
      Runtime.trap("Blob key and filename cannot be empty or whitespace only");
    };
    resume := ?{ blobKey; filename };
  };

  public query ({ caller }) func getResume() : async ?Resume {
    resume;
  };

  public shared ({ caller }) func addProject(title : Text, description : Text, fileBlobKey : ?Text) : async () {
    if (not isValidText(title) or not isValidText(description)) {
      Runtime.trap("Title and description cannot be empty or whitespace only");
    };

    let id : Text = title.concat("!")
      .concat(description)
      .concat("!")
      .concat(
        switch (fileBlobKey) {
          case (null) { "<no file>" };
          case (?key) { key };
        }
      );
    let project : Project = { id; title; description; fileBlobKey };
    projects.add(project);
  };

  public query ({ caller }) func getProjects() : async [Project] {
    projects.toArray();
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not isValidText(id)) {
      Runtime.trap("ID cannot be empty or whitespace only");
    };

    let filteredProjects = projects.filter(func(project) { project.id != id });
    projects.clear();

    let iter = filteredProjects.values();
    // Process the first element to determine if we have any elements
    switch (iter.next()) {
      case (null) {
        // No elements left, nothing to add
        return;
      };
      case (?p) {
        // Add the first element
        projects.add(p);
      };
    };

    // Process remaining elements using repeat-until pattern
    func processIterator() {
      switch (iter.next()) {
        case (null) {
          // No more elements, stop processing
        };
        case (?p) {
          // Add element and continue processing
          projects.add(p);
          processIterator();
        };
      };
    };

    // Start processing remaining elements
    processIterator();
  };
};
