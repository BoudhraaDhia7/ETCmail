<?php

namespace App\Entity;

use App\Repository\MailStatusEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MailStatusEntityRepository::class)
 */
class MailStatusEntity
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
    private $seen_date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $uniqueid;

    /**
     * @ORM\ManyToOne(targetEntity=MailEntity::class, inversedBy="id")
     */
    private $mailEntity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSeenDate(): ?string
    {
        return $this->seen_date;
    }

    public function setSeenDate(string $seen_date): self
    {
        $this->seen_date = $seen_date;

        return $this;
    }

    public function getUniqueid(): ?string
    {
        return $this->uniqueid;
    }

    public function setUniqueid(?string $uniqueid): self
    {
        $this->uniqueid = $uniqueid;

        return $this;
    }

    public function getMailEntity(): ?MailEntity
    {
        return $this->mailEntity;
    }

    public function setMailEntity(?MailEntity $mailEntity): self
    {
        $this->mailEntity = $mailEntity;

        return $this;
    }
}
