package eu.westlife;

/**
 * Created by vagrant on 9/15/16.
 */

import io.milton.annotations.ChildrenOf;
import io.milton.annotations.PutChild;
import io.milton.annotations.ResourceController;
import io.milton.annotations.Root;
import io.milton.annotations.Get;
import java.util.ArrayList;
import java.util.List;

@ResourceController
public class ScratchController {
    private static org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(ScratchController.class);

    private List<ArtifactType> artifactTypes = new ArrayList<ArtifactType>();

    public ScratchController(){
        artifactTypes.add(new ArtifactType("EUDAT B2Drop"));
        artifactTypes.add((new ArtifactType("Google Drive")));
        artifactTypes.add((new ArtifactType("DropBox")));
        artifactTypes.add((new ArtifactType("Amazon S3")));
    }

    @Root
    public ScratchController getRoot() {
        return this;
    }

    @ChildrenOf
    public List<ArtifactType> getProducts(ScratchController root) {
        return artifactTypes;
    }

    @ChildrenOf
    public List<Artifact> getProductFiles(ArtifactType artifactType) {
        return artifactType.getArtifacts();
    }
    @PutChild
    public Artifact upload(ArtifactType artifactType, String newName, byte[] bytes) {
        Artifact af = new Artifact(newName, bytes);
        artifactType.getArtifacts().add(af);
        return af;
    }

    @Get
    public byte[] download(Artifact artifact) {
        return artifact.bytes;
    }


    public class ArtifactType {
        private String name;

        public ArtifactType(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        private List<Artifact> artifacts = new ArrayList<Artifact>();

        public List<Artifact> getArtifacts() {
            return artifacts;
        }
    }

        public class Artifact {
            private String name;
            private byte[] bytes;

            public Artifact(String name, byte[] bytes) {
                this.name = name;
                this.bytes = bytes;
            }

            public String getName() {
                return name;
            }
        }

    }
