<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $ProductName;

    #[ORM\Column(type: 'string', length: 255)]
    private $Description;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $DefaultPrice;

    #[ORM\OneToMany(mappedBy: 'Product', targetEntity: InvoiceItem::class)]
    private $Invoice;

    public function __construct()
    {
        $this->Invoice = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductName(): ?string
    {
        return $this->ProductName;
    }

    public function setProductName(string $ProductName): self
    {
        $this->ProductName = $ProductName;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getDefaultPrice(): ?int
    {
        return $this->DefaultPrice;
    }

    public function setDefaultPrice(?int $DefaultPrice): self
    {
        $this->DefaultPrice = $DefaultPrice;

        return $this;
    }

    /**
     * @return Collection<int, InvoiceItem>
     */
    public function getInvoice(): Collection
    {
        return $this->Invoice;
    }

    public function addInvoice(InvoiceItem $invoice): self
    {
        if (!$this->Invoice->contains($invoice)) {
            $this->Invoice[] = $invoice;
            $invoice->setProduct($this);
        }

        return $this;
    }

    public function removeInvoice(InvoiceItem $invoice): self
    {
        if ($this->Invoice->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getProduct() === $this) {
                $invoice->setProduct(null);
            }
        }

        return $this;
    }
}
