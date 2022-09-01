<?php
namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use JsonSerializable;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\MailEntityRepository;

/**
 * @ORM\Entity(repositoryClass=MailEntityRepository::class)
 */
class MailEntity implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $receiver;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sender;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $subject;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $content;

    /**
     * @ORM\OneToMany(targetEntity=MailStatusEntity::class, mappedBy="mailEntity")
     */
    private $uniqueid;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $foring_id;

    public function __construct()
    {
        $this->uniqueid = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReceiver(): ?string
    {
        return $this->receiver;
    }

    public function setReceiver(string $receiver): self
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getSender(): ?string
    {
        return $this->sender;
    }

    public function setSender(string $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(?string $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(?string $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    //convert to json object for datatable respone
    public function jsonSerialize()
    {
        //defien the json object
        $json = [
            'receiver' => $this->getReceiver(),
            'date' => $this->getdate(),
            'subject' => $this->getsubject(),
            'object' => $this->getsubject(),

            //formatting the content object for big size content
            'content' =>
                strlen($this->getcontent()) > 165
                    ? str_replace(
                        substr(
                            $this->getcontent(),
                            164,
                            strlen($this->getcontent()) - 166
                        ),
                        '...',
                        $this->getcontent()
                    )
                    : $this->getcontent(),

            //defining the satuts of the email read or not
            'status' =>
                ' <div class="status-items">
            <div class="dot-item">
               <span class="dot-red"></span>
               <p class="seen-time">Pas encore lu </p></div>
               <a href="/preview/' .
                $this->getId() .
                '">
               <img
                src="image/eye.svg"
                alt="eye.svg"
                class="eye"
                width="20"
                height="17" />
            </a></div>',
        ];

        //format the second state
        $status = $this->getUniqueid();
        foreach ($status as $key => $state) {
            $key == 0 ? ($json['status'] = '') : '';
            if (count($status) == 1) {
                $json['status'] .=
                    ' <div class="status-items">
                      <div class="dot-item">
                      <span class="dot"></span>
                      <p class="seen-time">' .
                    $state->getSeenDate() .
                    '</p>
                     </div>
                      <img
                     src="image/eye.svg"
                alt="eye.svg"
                class="eye"
                width="20"
                  height="17" />
             </a></div>';
                break;
            } else {
                $json['status'] .=
                    ' <div class="status-items">
                     <div class="dot-item">
                     <span class="dot"></span>
                     <p class="seen-time">' .
                    $state->getSeenDate() .
                    '</p>
            </div>';
                if ($key == 1) {
                    $json['status'] .=
                        '<a href="/preview/' .
                        $this->getId() .
                        '">
                <img
                src="image/eye.svg"
                alt="eye.svg"
                class="eye"
                width="20"
                  height="17" />
             </a></div>';
                    break;
                }
            }
        }

        return $json;
    }

    /**
     * @return Collection<int, mailstatusentity>
     */
    public function getUniqueid(): Collection
    {
        return $this->uniqueid;
    }

    public function addUniqueid(mailstatusentity $uniqueid): self
    {
        if (!$this->uniqueid->contains($uniqueid)) {
            $this->uniqueid[] = $uniqueid;
            $uniqueid->setMailEntity($this);
        }

        return $this;
    }

    public function removeUniqueid(mailstatusentity $uniqueid): self
    {
        if ($this->uniqueid->removeElement($uniqueid)) {
            // set the owning side to null (unless already changed)
            if ($uniqueid->getMailEntity() === $this) {
                $uniqueid->setMailEntity(null);
            }
        }

        return $this;
    }

    public function getForingId(): ?string
    {
        return $this->foring_id;
    }

    public function setForingId(string $foring_id): self
    {
        $this->foring_id = $foring_id;

        return $this;
    }
}
